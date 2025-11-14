"use client";

import { useState } from "react";
import { api } from "./utils/api/api";
import { motion } from "framer-motion";
import SuccessMessage from "./model/successMessage";

export default function SendKindMessage() {
  const [text, setText] = useState("");
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [bodyText, setBodyText] = useState("Your sweet message has reached your beloved. May it bring a smile to their heart!");
  const [headerText, setHeaderText] = useState("Your Love Has Been Sent 💌");


  async function sendMessage() {
    if (!text.trim()) return;

    const response = await api.postWithoutAuth({
      endPoint: "/sendMessage",
      telegramBotToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!,
      sendData: { text, chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID },
    });

    if (response.status === 200) {
      setIsOpenSuccessModal(true);
      setText("");
    }else {
      setHeaderText("Oops! Something Went Wrong 💔");
      setBodyText("Your love couldn’t be delivered this time. Try again and send your heart once more!");
    }
  }

  const closeSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <motion.div
        className="mt-8 w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="font-satisfy text-2xl mb-4 text-pink-300 text-center">
          Send Your Love 💖
        </h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your sweet message..."
          className="w-full p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-24"
        />
        <button
          onClick={sendMessage}
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-xl transition-colors duration-300 shadow-md"
        >
          Send My Love 💌
        </button>

      </motion.div>
      <SuccessMessage
        isOpen={isOpenSuccessModal}
        headerText={headerText}
        bodyText={bodyText}
        onClose={closeSuccessModal}
      />
    </>


  );
}
