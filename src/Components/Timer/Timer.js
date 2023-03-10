import React from "react";
import { useTimer } from "react-timer-hook";
import { FaPlay, FaPause } from "react-icons/fa";
import { getExpiryTimestamp, getCountWithZero } from "./helpers";
import useSound from "use-sound";
import gongSound from "../../assets/audio/start_end_gong.mp3";
import {
  Text,
  IconButton,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MyTimer() {
  // To change the default starting timer, change the below. It'll also update the slider anchor:
  const startingMinutes = 10;
  //This is the minutes count as displayed above the slider:
  const [displayMinutes, setDisplayMinutes] = useState(startingMinutes);
  //This is the max minutes count, used for the ring animation:
  const [maxMinutes, setMaxMinutes] = useState(startingMinutes);
  //This sets the initial timer:
  var expiryTimestamp = getExpiryTimestamp(startingMinutes);
  //This is the hook for playing the gong sound:
  const [playGong] = useSound(gongSound);

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => playGong(),
    autoStart: false,
  });

  return (
    <VStack gap="10">
      <CircularProgress
        size={["350px", "400px"]}
        thickness="2px"
        value={maxMinutes * 60 - (minutes * 60 + seconds)}
        min={0}
        max={maxMinutes * 60}
        color="white"
        trackColor="whiteAlpha.500"
        capIsRound={true}
      >
        <CircularProgressLabel>
          <Text
            fontSize={["90px", "100px"]}
            fontFamily={"de_valenciaregular, sans-serif"}
          >
            {getCountWithZero(minutes)}:{getCountWithZero(seconds)}
          </Text>
        </CircularProgressLabel>
      </CircularProgress>
      <VStack width="75%">
        <Text>{displayMinutes} minute session</Text>
        <Slider
          aria-label="slider-ex-1"
          min={5}
          max={59}
          defaultValue={startingMinutes}
          //This sets the timer to the value selected by user. False means the timer won't start as soon as user releases the draggable thumb.
          onChangeEnd={(val) => {
            restart(getExpiryTimestamp(val), false);
            setMaxMinutes(val);
          }}
          onChange={(val) => setDisplayMinutes(val)}
        >
          <SliderTrack bg="whiteAlpha.500">
            <SliderFilledTrack bg="white" />
          </SliderTrack>
          <SliderThumb
            _focus={{ boxShadow: "none" }} //this overrides Chakra's default settings whereby the shadow persists for as long as the slider is in focus.
            _hover={{ boxShadow: "0 0 0 5px #38B2AC80" }}
          />
        </Slider>
      </VStack>
      <IconButton
        variant="solid"
        size="lg"
        colorScheme="whiteAlpha"
        borderRadius="full"
        icon={isRunning ? <FaPause /> : <FaPlay />}
        onClick={
          isRunning
            ? pause
            : () => {
                playGong();
                resume();
              }
        }
      ></IconButton>
    </VStack>
  );
}
