import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip"
import { Mic, SlidersHorizontal, Volume2, VolumeX } from "lucide-react"
import SiriWave from "siriwave"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import { Label } from "../ui/label"

const VoiceCard = ({
  startRecording,
  setStartRecording,
  muted,
  setMuted,
  microphone,
  getMicrophone,
  siriwaveRef,
  ttsSiriwaveRef,
  captionsRef,
  provider,
  setProvider
}: {
  startRecording: boolean
  setStartRecording: React.Dispatch<React.SetStateAction<boolean>>
  muted: boolean
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
  microphone: MediaRecorder | null
  getMicrophone: () => Promise<MediaRecorder | null>
  siriwaveRef: React.MutableRefObject<SiriWave | null>
  ttsSiriwaveRef: React.MutableRefObject<SiriWave | null>
  captionsRef: React.MutableRefObject<HTMLDivElement | null>
  provider: string | undefined
  setProvider: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="fixed bottom-6 z-50">
        <Card className="pb-4 px-6 w-72 backdrop-blur-sm shadow-lg border-t">
          {startRecording ? (
            <CardTitle>
              <div
                id="captions"
                ref={captionsRef}
                className="text-sm text-center min-h-6 "
              />

              <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium ">You</span>
                  {muted ? (
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            if (microphone?.state === "paused") {
                              microphone.resume()
                              setMuted(false)
                            }
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 "
                        >
                          <VolumeX className="h-4 w-4 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Unmute</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            if (microphone?.state === "recording") {
                              microphone.pause()
                              setMuted(true)
                            }
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Mute</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="rounded-lg p-2">
                  <div id="siriwave" className="h-12" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-base font-medium">AI</span>
                <div className="rounded-lg p-2">
                  <div id="tts-siriwave" className="h-12" />
                </div>
              </div>
            </CardTitle>
          ) : (
            <CardTitle className="flex justify-center gap-2 pt-4">
              <Button
                onClick={() => {
                  getMicrophone().then((mediaRecorder) => {
                    if (mediaRecorder) {
                      setStartRecording(true)
                    } else {
                      toast.error("Error accessing microphone")
                    }
                  })
                }}
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Voice Chat
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <SlidersHorizontal size={14} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                      Adjust the settings for the voice chat
                    </DialogDescription>
                  </DialogHeader>
                  <section className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="provider">Provider</Label>
                      <Select
                        value={provider}
                        onValueChange={(value) => setProvider(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent id="provider" className="w-full">
                          <SelectGroup>
                            <SelectItem value="deepgram">Deepgram</SelectItem>
                            <SelectItem value="elevenlabs">
                              Elevenlabs
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </section>
                </DialogContent>
              </Dialog>
            </CardTitle>
          )}
        </Card>
      </div>
    </section>
  )
}

export default VoiceCard
