'use client';

import BeautifulMemories from "./beautifulMemories";
import BirthdayCard from "./wishCard";
import ChangePhoto from "./movingPhoto";
import SpecialMessage from "./specialMessage";
import RingCarousel from "./carrousel";

export default function BirthdayPage() {
  return (
    <>
      <BirthdayCard />
      <BeautifulMemories />
      <ChangePhoto />
      <SpecialMessage />
      <RingCarousel /> 
    </>
  )
}
