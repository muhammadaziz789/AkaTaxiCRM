const CustomBtn = ({ icon, text, handleClick, ...props }: { icon?: any; text: string; handleClick?: () => void }) => {
  return (
    <button onClick={handleClick} className="bg-[var(--danger)] rounded-[10px] flex h-[48px] px-8 flex items-center space-x-2 text-white font-medium">
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
};

export default CustomBtn