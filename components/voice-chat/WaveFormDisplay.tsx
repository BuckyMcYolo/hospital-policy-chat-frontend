"use client"

import React, { useEffect, useRef, useState } from "react"
import { patients, Patient } from "@/components/unit-voice/patientTypes"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { ArrowDown, ArrowUp, TrendingDown } from "lucide-react"
import { useChat, Message } from "ai/react"
import { toast } from "sonner"
import moment from "moment"
import Siriwave from "siriwave"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Card, CardTitle } from "@/components/ui/card"

const WaveFormDisplay = ({
  siriwaveRef,
  ttsSiriwaveRef,
  role,
  patientList,
  microphone,
  setMicrophone,
  muted,
  provider,
  setProvider
}: {
  siriwaveRef: React.MutableRefObject<Siriwave | null>
  ttsSiriwaveRef: React.MutableRefObject<Siriwave | null>
  role: string
  patientList: Patient[] | null
  microphone: MediaRecorder | null
  setMicrophone: React.Dispatch<React.SetStateAction<MediaRecorder | null>>
  muted: boolean
  provider: string | undefined
  setProvider: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  const [recording, setRecording] = useState(false)
  const socket = useRef<WebSocket | null>(null)
  const audioState = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Web Audio API
  const audioContext = useRef<AudioContext | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const dataArray = useRef<Uint8Array | null>(null)
  const animationFrameId = useRef<number | null>(null)
  const ttsAudioContext = useRef<AudioContext | null>(null)
  const ttsAnalyser = useRef<AnalyserNode | null>(null)
  const ttsDataArray = useRef<Uint8Array | null>(null)
  const ttsAnimationFrameId = useRef<number | null>(null)

  const { resolvedTheme } = useTheme()

  const handleAudio = async (message: Message) => {
    try {
      // Check if there is an existing audio playing and stop it
      if (audioState.current) {
        audioState.current.pause()
        audioState.current.currentTime = 0
        setIsAudioPlaying(false)
        audioState.current = null
      }

      const res = await fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:5000/v1/tts?provider=${provider}`
          : process.env.NEXT_PUBLIC_PRODUCTION_URL +
              `/v1/tts?provider=${provider}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: message.content })
        }
      )
      const blob = await res.blob()
      const audioUrl = URL.createObjectURL(blob)
      const newAudio = new Audio(audioUrl)

      // Set up TTS AudioContext and AnalyserNode
      if (!ttsAudioContext.current) {
        ttsAudioContext.current = new AudioContext()
      }
      const source = ttsAudioContext.current.createMediaElementSource(newAudio)
      ttsAnalyser.current = ttsAudioContext.current.createAnalyser()
      source.connect(ttsAnalyser.current)
      ttsAnalyser.current.connect(ttsAudioContext.current.destination)
      ttsAnalyser.current.fftSize = 2048
      ttsDataArray.current = new Uint8Array(ttsAnalyser.current.fftSize)

      // Set the new audio state and play the audio
      if (!audioState.current) {
        audioState.current = newAudio
        newAudio.play()
        setIsAudioPlaying(true)

        newAudio.onended = () => {
          setIsAudioPlaying(false)
          cancelAnimationFrame(ttsAnimationFrameId.current!) // Stop the TTS waveform drawing
          audioState.current = null
        }

        // Start drawing the TTS waveform
        drawTTSWaveform()
      } else {
        toast.error(
          "Please abort the current audio message before requesting a new one."
        )
      }
    } catch (error) {
      console.error("Error playing audio:", error)
    }
  }

  const { messages, data, setMessages, reload, stop, isLoading, append } =
    useChat({
      initialMessages: [
        {
          role: "system",
          content:
            "Your name is Ava.  Please provide with short and concise responses. Your output is being streamed to a speech model. Here are some tips for achieving better audio output: 1. If you need to insert a longer pause in your audio, use the ellipsis: .... A comma (,) present in your text will be treated as a very short pause. 2. Filler words such as um and uh can also be used to offer a more natural sounding audio output. Please use longer words instead of acronyms. For example, use 'Oxygen' instead of '02'.",
          id: "1wbjkjfgbkj"
        }
      ],
      api:
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/v1/chat/voice"
          : process.env.NEXT_PUBLIC_PRODUCTION_URL + "/v1/chat/voice",
      onError: (error) => {
        console.log(error)
        toast.error(error.message)
      },
      onFinish(message) {
        handleAudio(message)
      },
      body: {
        patientList
      }
    })

  useEffect(() => {
    if (role && !socket.current) {
      socket.current = new WebSocket(
        process.env.NODE_ENV === "development"
          ? "ws://localhost:5000"
          : process.env.NEXT_PUBLIC_PRODUCTION_WS_URL!
      )

      socket.current.addEventListener("open", async () => {
        console.log("client: connected to server")
      })

      socket.current.addEventListener("message", (event) => {
        const data = JSON.parse(event.data)
        console.log("client: data received", data)
        if (
          data.type === "Results" &&
          data.channel.alternatives[0].transcript !== ""
        ) {
          append({
            role: "user",
            content: data.channel.alternatives[0].transcript,
            id: String(messages.length + 1)
          })
        }
      })

      socket.current.addEventListener("close", () => {
        console.log("client: disconnected from server")
      })
      handleButtonClick()
    }
  }, [role, socket.current])

  //disconnect on unmount or page change
  // useEffect(() => {
  //   return () => {
  //     if (socket.current) {
  //       socket.current.close()
  //       // window.location.reload()
  //     }
  //   }
  // }, [])

  const getMicrophone = async (): Promise<MediaRecorder> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      // Setup Web Audio API
      if (!audioContext.current) {
        audioContext.current = new AudioContext()
      }
      const source = audioContext.current.createMediaStreamSource(stream)
      analyser.current = audioContext.current.createAnalyser()
      source.connect(analyser.current)
      analyser.current.fftSize = 2048
      dataArray.current = new Uint8Array(analyser.current.fftSize)

      return new MediaRecorder(stream, { mimeType: "audio/webm" })
    } catch (error) {
      console.error("error accessing microphone:", error)
      throw error
    }
  }

  const openMicrophone = async (
    microphone: MediaRecorder,
    socket: WebSocket
  ): Promise<void> => {
    return new Promise((resolve) => {
      microphone.onstart = () => {
        console.log("client: microphone opened")
        setRecording(true)
        resolve()
        drawSiriWave()
      }

      microphone.onstop = () => {
        console.log("client: microphone closed")
        setRecording(false)
        cancelAnimationFrame(animationFrameId.current!) // Stop the Siriwave drawing
        if (siriwaveRef.current) {
          siriwaveRef.current.stop()
        }
        siriwaveRef.current = null
      }

      microphone.ondataavailable = (event: BlobEvent) => {
        console.log("client: microphone data received")
        if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
          socket.send(event.data)
        }
        // Check audio level
        if (analyser.current && dataArray.current) {
          // console.log("CHECKING AUDIO LEVEL")
          analyser.current.getByteTimeDomainData(dataArray.current)

          // Normalize the amplitude for monitoring
          let sum = 0
          for (let i = 0; i < dataArray.current.length; i++) {
            sum += (dataArray.current[i] - 128) * (dataArray.current[i] - 128)
          }
          const rms = Math.sqrt(sum / dataArray.current.length)
          const amplitude = rms / 128.0

          const threshold = 0.2
          if (amplitude > threshold) {
            if (audioState.current) {
              audioState.current.pause()
              audioState.current.currentTime = 0
              setIsAudioPlaying(false)
              audioState.current = null
            }
          }
        }
      }

      microphone.start(1000)
    })
  }

  const closeMicrophone = async (microphone: MediaRecorder): Promise<void> => {
    microphone.stop()
  }

  const handleButtonClick = async () => {
    if (!microphone) {
      try {
        const mic = await getMicrophone()
        setMicrophone(mic)
        if (socket.current) {
          await openMicrophone(mic, socket.current)
        }
      } catch (error) {
        console.error("error opening microphone:", error)
      }
    } else {
      await closeMicrophone(microphone)
      setMicrophone(null)
    }
  }

  const drawSiriWave = () => {
    if (!siriwaveRef.current) {
      const container = document.getElementById("siriwave")
      if (container) {
        siriwaveRef.current = new Siriwave({
          container,
          width: 300,
          height: 100,
          style: "ios",
          speed: 0.1,
          amplitude: 0.1,
          frequency: 10,
          color: resolvedTheme === "dark" ? "#fff" : "#000",
          autostart: true,
          cover: true
        })
        siriwaveRef.current.start()
      }
    }

    const draw = () => {
      if (!analyser.current || !dataArray.current) return
      animationFrameId.current = requestAnimationFrame(draw)

      analyser.current.getByteTimeDomainData(dataArray.current)

      // Normalize the amplitude for Siriwave
      let sum = 0
      for (let i = 0; i < dataArray.current.length; i++) {
        sum += (dataArray.current[i] - 128) * (dataArray.current[i] - 128)
      }
      const rms = Math.sqrt(sum / dataArray.current.length)
      const amplitude = (rms / 128.0) * 20

      if (siriwaveRef.current) {
        siriwaveRef.current.setAmplitude(amplitude)
      }
    }

    draw()
  }

  const drawTTSWaveform = () => {
    if (!ttsSiriwaveRef.current) {
      const container = document.getElementById("tts-siriwave")
      if (container) {
        ttsSiriwaveRef.current = new Siriwave({
          container,
          width: 300,
          height: 100,
          style: "ios",
          speed: 0.1,
          amplitude: 0.1,
          frequency: 10,
          color: resolvedTheme === "dark" ? "#3b82f6" : "#0000FF",
          autostart: true,
          cover: true
        })
        ttsSiriwaveRef.current.start()
      }
    }

    const draw = () => {
      if (!ttsAnalyser.current || !ttsDataArray.current) return

      ttsAnimationFrameId.current = requestAnimationFrame(draw)

      ttsAnalyser.current.getByteTimeDomainData(ttsDataArray.current)

      // Normalize the amplitude for Siriwave
      let sum = 0
      for (let i = 0; i < ttsDataArray.current.length; i++) {
        sum += (ttsDataArray.current[i] - 128) * (ttsDataArray.current[i] - 128)
      }
      const rms = Math.sqrt(sum / ttsDataArray.current.length)
      const amplitude = (rms / 128.0) * 20

      if (ttsSiriwaveRef.current) {
        ttsSiriwaveRef.current.setAmplitude(amplitude)
      }
    }

    draw()
  }

  useEffect(() => {
    if (muted) {
      if (siriwaveRef.current) {
        siriwaveRef.current.setAmplitude(0)
      }
    } else {
      drawSiriWave()
    }

    // Cleanup function to cancel animation frames
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [muted])

  return <div></div>
}

export default WaveFormDisplay
