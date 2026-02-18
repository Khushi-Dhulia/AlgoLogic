export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFEA00] to-slate-50">
      <div className="h-[600px] w-[1040px] rounded-4xl flex overflow-hidden shadow-[0px_7px_13px_9px_rgba(8,_11,_14,_0.06)]">
        {children}
      </div>
    </div>
  );
}

export function AuthLeft({ children }) {
  return (
    <div className="w-1/2 bg-gradient-to-br from-[#FFFDEB] to-white p-12 flex flex-col justify-center">
      {children}
    </div>
  );
}

export function AuthRight({ children }) {
  return (
    <div className="w-1/2 bg-[#292524] text-white flex flex-col justify-between p-10">
      {children}
    </div>
  );
}
