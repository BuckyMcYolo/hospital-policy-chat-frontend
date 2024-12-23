"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"

const PasswordDialog = () => {
  const [passwordInput, setPasswordInput] = React.useState("")

  const postPassword = async () => {
    const url = "/password"
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ password: passwordInput }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      console.log("Password correct")
      toast.success("Password correct")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      console.error("Password incorrect")
      toast.error("Password incorrect")
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="shadow-lg border dark:border-neutral-700 p-4 md:p-8 lg:min-w-96 max-w-xl w-full dark:bg-neutral-950">
        <CardTitle className="py-2">Please enter the password</CardTitle>
        <CardDescription>
          To access this site, please enter the site password.
        </CardDescription>
        <CardContent className="flex items-center justify-between gap-2 pt-5">
          <Input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                postPassword()
              }
            }}
          />
          <Button size="icon" onClick={postPassword} variant="ghost">
            <SendIcon size={24} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordDialog
