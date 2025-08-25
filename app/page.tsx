import AI_Voice from "../components/kokonutui/ai-voice"
import ProfileDropdown from "../components/kokonutui/profile-dropdown"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* Profile Dropdown no canto superior direito */}
      <div className="absolute top-4 right-4 z-10">
        <ProfileDropdown />
      </div>
      <AI_Voice />
    </div>
  )
}
