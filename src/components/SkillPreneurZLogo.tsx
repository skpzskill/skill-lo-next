import Image from "next/image";

interface SkillPreneurZLogoProps {
  className?: string;
}

const SkillPreneurZLogo = ({ className = "w-8 h-8" }: SkillPreneurZLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="SkillPreneurZ"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default SkillPreneurZLogo;

