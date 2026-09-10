"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import type { Profile } from "@/types";

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <Button onClick={() => setEditing(true)} className="!px-4 !py-2 !text-xs">
        Edit profile
      </Button>
    );
  }

  return <EditProfileForm profile={profile} onDone={() => setEditing(false)} />;
}