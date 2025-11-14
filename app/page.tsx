'use client';

import BeautifulMemories from "./beautifulMemories";
import WishCard from "./wishCard";
import ChangePhoto from "./movingPhoto";
import SpecialMessage from "./specialMessage";
import SendToTelegram from "./sendMessage";

export default function BirthdayPage() {
  return (
    <>
      <WishCard />
      <BeautifulMemories />
      <ChangePhoto />
      <SpecialMessage />
    </>
  )
}
