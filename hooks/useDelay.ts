import { useState, useEffect } from "react";

export default function useDelay(delay: number) {
  const execute = async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  return execute;
}
