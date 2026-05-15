"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type ProfileData = {
  full_name: string | null
  email: string | null
  plan: string | null
  credits: number | null
  avatar_url: string | null
}

export default function SettingsPage() {
  const router = useRouter()

  const [userId, setUserId] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [plan, setPlan] = useState("Free")
  const [credits, setCredits] = useState(5)
  const [avatarUrl, setAvatarUrl] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUserId(user.id)

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, plan, credits, avatar_url")
        .eq("id", user.id)
        .maybeSingle<ProfileData>()

      setFullName(
        data?.full_name ||
          (typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "")
      )

      setEmail(data?.email || user.email || "")
      setPlan(data?.plan || "Free")
      setCredits(typeof data?.credits === "number" ? data.credits : 5)
      setAvatarUrl(data?.avatar_url || "")

      setLoading(false)
    }

    loadSettings()
  }, [router])

  function handleAvatarChange(file: File | null) {
    setError("")
    setMessage("")

    if (!file) return

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG, JPG, JPEG, and WEBP images are allowed.")
      return
    }

    const maxSize = 2 * 1024 * 1024

    if (file.size > maxSize) {
      setError("Profile photo must be smaller than 2MB.")
      return
    }

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function uploadAvatar() {
    if (!avatarFile || !userId) return avatarUrl

    const fileExt = avatarFile.name.split(".").pop() || "png"
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      })

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  async function saveProfile() {
    setSaving(true)
    setError("")
    setMessage("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const uploadedAvatarUrl = await uploadAvatar()

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: uploadedAvatarUrl,
        })
        .eq("id", user.id)

      if (error) {
        throw new Error(error.message)
      }

      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: uploadedAvatarUrl,
        },
      })

      setAvatarUrl(uploadedAvatarUrl || "")
      setAvatarFile(null)
      setAvatarPreview("")
      setMessage("Profile updated successfully.")
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Profile update failed."
      )
    } finally {
      setSaving(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <main className="authPage">
        <section className="authCard">
          <h1>Loading settings...</h1>
        </section>
      </main>
    )
  }

  const activeAvatar = avatarPreview || avatarUrl

  return (
    <main className="authPage">
      <section className="authLeft">
        <Link href="/" className="authLogo">
          <img src="/logo.png" alt="EtsySEO AI" />
        </Link>

        <div>
          <span className="authBadge">Account Settings</span>

          <h1>Manage your EtsySEO AI account</h1>

          <p>
            Update your profile photo, check your current plan, view credits and
            manage account access.
          </p>
        </div>
      </section>

      <section className="authCard">
        <div className="authHeader">
          <h2>Settings</h2>
          <p>Your real account information.</p>
        </div>

        <form className="authForm">
          <label>Profile Photo</label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "86px",
                height: "86px",
                borderRadius: "999px",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, #d4af37 0%, #22c55e 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06111f",
                fontSize: "32px",
                fontWeight: 900,
              }}
            >
              {activeAvatar ? (
                <img
                  src={activeAvatar}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                fullName.charAt(0) || "U"
              )}
            </div>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) =>
                handleAvatarChange(e.target.files?.[0] || null)
              }
            />
          </div>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email Address</label>

          <input type="email" value={email} disabled />

          <label>Current Plan</label>

          <input type="text" value={plan} disabled />

          <label>Credits Remaining</label>

          <input type="text" value={credits} disabled />

          {message && <p className="generateError">{message}</p>}

          {error && <p className="generateError">{error}</p>}

          <button
            type="button"
            className="authButton"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

          <Link href="/pricing" className="googleButton">
            Manage / Upgrade Plan
          </Link>

          <button type="button" className="googleButton" onClick={logout}>
            Logout
          </button>
        </form>

        <p className="authSwitch">
          Back to <Link href="/dashboard">Dashboard</Link>
        </p>
      </section>
    </main>
  )
}