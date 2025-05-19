"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/store";
import { getCurrentUser } from "@/lib/redux/features/userSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  // Check for current user on initial load
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
}
