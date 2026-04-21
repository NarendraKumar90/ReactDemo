import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, PlayCircle, Trophy, CircleDot, Shield } from "lucide-react";

const gamesTop = [
  { title: "AVIATOR", img: "https://via.placeholder.com/400x200" },
  { title: "CHICKEN ROAD", img: "https://via.placeholder.com/400x200" },
  { title: "SATTA MATKA", img: "https://via.placeholder.com/400x200" },
  { title: "MINES", img: "https://via.placeholder.com/400x200" },
  { title: "MARBLE RUN", img: "https://via.placeholder.com/400x200" },
  { title: "CRIME EMPIRE", img: "https://via.placeholder.com/400x200" },
];

const newLaunch = [
  { title: "DUCK RACING", img: "https://via.placeholder.com/400x300" },
  { title: "STAIR PONG", img: "https://via.placeholder.com/400x300" },
  { title: "SUGAR DADDY", img: "https://via.placeholder.com/400x300" },
];

export default function ReddyGameHome() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */
      const [isLoggedIn, setIsLoggedIn] = React.useState(false);

      const handleAuthAction = () => {
        setIsLoggedIn(!isLoggedIn);
      };

      <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
        <div className="flex items-end gap-1">
          <h1 className="text-4xl font-extrabold text-yellow-400 tracking-widest leading-none">
            REDDY
          </h1>
          <span className="text-xs text-white mb-1">BOOK</span>
        </div>

        <div className="flex gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleAuthAction}
                className="w-28 h-10 bg-[#2c2c2c] border border-pink-500 text-white text-sm font-semibold tracking-wide uppercase rounded-md"
              >
                Signup
              </button>

              <button
                onClick={handleAuthAction}
                className="w-28 h-10 bg-[#2c2c2c] border border-pink-500 text-white text-sm font-semibold tracking-wide uppercase rounded-md"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleAuthAction}
              className="w-28 h-10 bg-[#2c2c2c] border border-pink-500 text-white text-sm font-semibold tracking-wide uppercase rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}}}
      <div className="flex justify-around items-center bg-gray-900 py-3 text-sm">
        <div className="flex flex-col items-center gap-1">
          <Home size={18} />
          HOME
        </div>
        <div className="flex flex-col items-center gap-1">
          <PlayCircle size={18} />
          IN-PLAY
        </div>
        <div className="flex flex-col items-center gap-1">
          <Trophy size={18} />
          CRICKET
        </div>
        <div className="flex flex-col items-center gap-1">
          <CircleDot size={18} />
          FOOTBALL
        </div>
        <div className="flex flex-col items-center gap-1">
          <Shield size={18} />
          TENNIS
        </div>
      </div>

      {/* Top Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {gamesTop.map((game, index) => (
          <Card key={index} className="overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
            <img src={game.img} alt={game.title} className="w-full h-32 object-cover" />
            <CardContent className="p-3 text-center font-semibold">
              {game.title}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Launch Section */}
      <div className="bg-red-700 py-3 text-center font-bold text-lg tracking-wide">
        NEW LAUNCH
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {newLaunch.map((game, index) => (
          <Card key={index} className="overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
            <img src={game.img} alt={game.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4 text-center font-semibold text-lg">
              {game.title}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cricket Section */}
      <div className="px-4 pb-10">
        <div className="flex justify-between items-center bg-red-600 px-4 py-3 rounded-2xl">
          <span className="font-bold">CRICKET</span>
          <div className="flex gap-3 text-sm">
            <span className="bg-white text-red-600 px-3 py-1 rounded-full">+ LIVE</span>
            <span className="bg-white text-red-600 px-3 py-1 rounded-full">+ VIRTUAL</span>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {[1, 2].map((match) => (
            <div
              key={match}
              className="bg-gray-900 p-4 rounded-2xl flex justify-between items-center shadow-md"
            >
              <div>
                <p className="font-semibold">KARNATAKA v JAMMU AND K</p>
                <p className="text-sm text-gray-400">Ranji Trophy</p>
              </div>
              <div className="text-green-400 font-semibold">LIVE</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
