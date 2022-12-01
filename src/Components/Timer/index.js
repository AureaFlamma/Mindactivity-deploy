import React from "react";
import { useTimer } from "react-timer-hook";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  Flex,
  Box,
  Text,
  IconButton,
  ButtonGroup,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MyTimer() {
  // To change the default starting timer, change the below. It'll also update the slider anchor:
  const startingMinutes = 10;
  //A separate state for display minutes is necessary as the timer hook doesn't give us a setMinutes function:
  const [displayMinutes, setDisplayMinutes] = useState(startingMinutes);
  //This sets the initial timer:
  var date = new Date();
  var expiryTimestamp = date.setSeconds(
    date.getSeconds() + 60 * startingMinutes
  );
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  return (
    <VStack>
      {/* TODO: BoxSize? */}
      <Flex
        bg="red"
        w={["200px", "300px"]}
        h={["200px", "300px"]}
        border="10px solid white"
        borderRadius="full"
        align="center"
        justify={"center"}
      >
        {/* TODO: There may be a problem with single/dbl digits. Possibly needs spearste containers */}
        <Text fontSize={["70px", "105px"]}>
          {minutes}:{seconds}
        </Text>
      </Flex>
      <Text>{displayMinutes} minute session</Text>
      <Slider
        aria-label="slider-ex-1"
        min={5}
        max={60}
        defaultValue={startingMinutes}
        //This sets the timer to the value selected by user.
        onChangeEnd={(val) => {
          date = new Date();
          expiryTimestamp = date.setSeconds(date.getSeconds() + 60 * val);
          restart(expiryTimestamp, false);
        }}
        onChange={(val) => setDisplayMinutes(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <IconButton
        variant="solid"
        size="lg"
        colorScheme="whiteAlpha"
        borderRadius="full"
        icon={isRunning ? <FaPause /> : <FaPlay />}
        onClick={isRunning ? pause : resume}
      ></IconButton>
    </VStack>
  );
}