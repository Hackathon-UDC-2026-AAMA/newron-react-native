import { Message } from "@/types/message";

const textMessageMocks: Message[] = [
  {
    id: "1",
    type: "Text",
    data: "Hello", // Short message
    timestamp: Date.now(),
  },
  {
    id: "2",
    type: "Text",
    data: "This is a slightly longer message that contains more content.", // Medium-length message
    timestamp: Date.now() - 1000,
  },
  {
    id: "3",
    type: "Text",
    data: "A very short msg.", // Short message with punctuation
    timestamp: Date.now() - 2000,
  },
  {
    id: "4",
    type: "Text",
    data: "Here is a medium length message. It doesn't go on for too long, but still provides some substance to simulate a normal user message.", // Medium-length message
    timestamp: Date.now() - 3000,
  },
  {
    id: "5",
    type: "Text",
    data: "This message is intentionally long, and is used to test how the application handles text data that is much longer than the usual message a user might send. It includes several sentences, making it much larger than typical text messages in the application, which allows for better testing of wrapping, performance, and handling of long content.", // Long message
    timestamp: Date.now() - 4000,
  },
  {
    id: "6",
    type: "Text",
    data: "Short msg again.", // Another short message
    timestamp: Date.now() - 5000,
  },
  {
    id: "7",
    type: "Text",
    data: "Slightly longer message that we are using as a mid-range length message for testing purposes.", // Mid-range length
    timestamp: Date.now() - 6000,
  },
  {
    id: "8",
    type: "Text",
    data: "Another message, this one is around the same length as the one before but can serve as a different example.", // Similar to 7, but worded differently
    timestamp: Date.now() - 7000,
  },
  {
    id: "9",
    type: "Link",
    data: "https://google.com", // Similar to 7, but worded differently
    timestamp: Date.now() - 7000,
  },
];

export { textMessageMocks };
