import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import { usePrompt } from "@/lib/context/PromptContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useStore } from "@/app/store/store";
import { observer } from "mobx-react-lite";

interface objParams {
  text: string;
  role: string;
  timeStamp: Date;
}

const questionSchema = z.object({
  question: z.string().min(2),
});

function PromptArea({
  instructions,
  informations,
}: {
  informations: string;
  instructions: string;
}) {
  const [messages, setMessages] = useState<objParams[]>([]);
  const [chat, setChat] = useState<ChatSession>();
  const { customPromptStore } = useStore();
  const { selectedCustomPrompt } = customPromptStore;

  console.log("information", informations);

  const api_key = import.meta.env.VITE_GEMINI_KEY;

  const genAI = new GoogleGenerativeAI(api_key);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  // const { currentPrompt } = usePrompt();

  const systemInstructions = ` ${instructions}  ${informations}`;

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: systemInstructions,
          })
          .startChat({
            generationConfig,
          });

        setChat(newChat);
      } catch (error) {
        console.error(error);
      }
    };

    initChat();
  }, []);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
    },
  });

  useEffect(() => {
    // Update form values whenever currentPrompt changes
    if (selectedCustomPrompt) {
      form.setValue("question", selectedCustomPrompt.prompt);
      form.handleSubmit(onSubmit)();
    }
  }, [selectedCustomPrompt, form]);

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    form.setValue("question", "");
    try {
      const userMessage = {
        text: values.question,
        role: "user",
        timeStamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (chat) {
        const result = await chat.sendMessage(values.question);

        const botMessage = {
          text: result.response.text(),
          role: "EDS.AI",
          timeStamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-between relative ">
      <ScrollArea className="w-full h-screen rounded-md custom-scrollbar p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col gap-3  hover:bg-gem-1
             rounded-xl mb-4 py-3"
          >
            <span
              className={`text-light-1 rounded-full px-2 bg-gem-AI-1 w-fit ${
                message.role === "user" ? "bg-gem-AI-1" : "bg-gem-AI-2"
              } `}
            >
              {message.role}
            </span>
            <p className="text-xl text-light-2 px-2">{message.text}</p>
          </div>
        ))}
      </ScrollArea>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sticky bottom-20 w-full flex "
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="w-full rounded-full ">
                <Input
                  placeholder="type something"
                  {...field}
                  className="no-focus btnBottom "
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default observer(PromptArea);
