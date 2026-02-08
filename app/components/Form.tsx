import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Toaster } from "sonner";
import { toast } from "sonner";

import { CircleCheckSVG, CircleXSVG } from "./ui/icons";
import { contactData } from "@/app/utils";

export const Form = () => {
  const { whatsapp } = contactData;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isInvalidName, setIsInvalidName] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isInvalidMessage, setIsInvalidMessage] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (name !== "") setIsInvalidName(false);
    if (
      email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    )
      setIsInvalidEmail(false);
    if (message !== "") setIsInvalidMessage(false);
  }, [name, email, message]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") setIsInvalidName(true);
    if (email === "") setIsInvalidEmail(true);
    if (message === "") setIsInvalidMessage(true);

    if (!name || !email || !message) {
      return;
    }

    try {
      const response = await axios.post("/api/send-email", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Failed to send email");
      } else {
        setError("Failed to send email");
      }
    }
  };

  if (error) {
    toast("Email has not been sent", {
      className: "my-classname",
      duration: 3000,
      icon: <CircleXSVG />,
    });
  }

  if (submitted) {
    toast("Email has been sent", {
      className: "my-classname",
      duration: 3000,
      icon: <CircleCheckSVG />,
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-3xl font-bold">Contact with me</h2>
      <p className="text-lg text-gray-400">
        You can also get in touch with me through this form below.
      </p>
      <Input
        id="name"
        type="text"
        label="Name"
        placeholder="Your Name"
        isInvalid={isInvalidName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMessage={isInvalidName && "Please enter your name"}
      />
      <Input
        type="email"
        name="email"
        id="email"
        label="Email"
        placeholder="YourEmailinclude@gmail.com"
        isInvalid={isInvalidEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={isInvalidEmail && "Please enter a valid email"}
      />
      <Textarea
        id="message"
        type="text"
        label="Message"
        placeholder="Enter your message here"
        minRows={4}
        isInvalid={isInvalidMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        errorMessage={isInvalidMessage && "Please enter your message"}
      />
      <Button type="submit">Send Message</Button>

      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-sm text-gray-400">Or message me directly on</span>
        <Link
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="text-green-500"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </Link>
      </div>

      <Toaster theme="dark" />
    </form>
  );
};
