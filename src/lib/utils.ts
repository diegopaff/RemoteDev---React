import toast from "react-hot-toast";

// handle the error to make it always a string
export const handleError = (error: unknown) => {
  //we have to make sure to extract a string message from the error before we toast it
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An unkown error occurred";
  }

  toast.error(message);
};
