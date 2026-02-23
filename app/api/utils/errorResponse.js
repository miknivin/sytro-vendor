import { NextResponse } from "next/server";

function toLabel(value) {
  if (!value) return "Value";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function parseApiError(error, fallbackMessage = "Internal Server Error") {
  if (error?.code === 11000) {
    const field = Object.keys(error?.keyPattern || error?.keyValue || {})[0];
    const label = toLabel(field);
    return {
      status: 409,
      message: `${label} is already registered`,
    };
  }

  if (error?.name === "ValidationError") {
    const messages = Object.values(error.errors || {})
      .map((item) => item?.message)
      .filter(Boolean);

    return {
      status: 400,
      message: messages.length ? messages.join(", ") : "Validation failed",
    };
  }

  if (error?.name === "CastError") {
    const label = toLabel(error?.path || "field");
    return {
      status: 400,
      message: `Invalid ${label}`,
    };
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return {
      status: 500,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: fallbackMessage,
  };
}

export function createErrorResponse(error, fallbackMessage) {
  const { status, message } = parseApiError(error, fallbackMessage);
  return NextResponse.json({ error: message }, { status });
}
