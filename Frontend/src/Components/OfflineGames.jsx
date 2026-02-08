import React, { useEffect, useState } from "react";

// 🍔 Good items player should catch
const foods = ["🍕", "🍔", "🍟", "🌭", "🍩"];

// 💣 Bad items player should avoid (but currently just reduce score)
const badItems = ["💣", "🗑️"];

// 🎯 Game Area Dimensions
const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const BASKET_WIDTH = 80;

const OfflineGame = () => {

  // 🧺 Basket horizontal position
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);

  // 🍔 Falling items state
  const [items, setItems] = useState([]);

  // 🏆 Player score
  const [score, setScore] = useState(0);

  // ❌ Game over state (currently not triggered)
  const [gameOver, setGameOver] = useState(false);

  // 🎮 Keyboard Controls (Move Basket)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        setBasketX((prev) => Math.max(prev - 25, 0)); // Prevent going outside left
      }
      if (e.key === "ArrowRight") {
        setBasketX((prev) => Math.min(prev + 25, GAME_WIDTH - BASKET_WIDTH)); // Prevent going outside right
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 🍕 Create new falling items every second
  useEffect(() => {
    if (gameOver) return;

    const dropInterval = setInterval(() => {
      const isBad = Math.random() < 0.2; // 20% chance of bad item

      const newItem = {
        id: Date.now(), // Unique ID
        x: Math.random() * (GAME_WIDTH - 30), // Random X position
        y: 0, // Start from top
        type: isBad
          ? badItems[Math.floor(Math.random() * badItems.length)]
          : foods[Math.floor(Math.random() * foods.length)],
        bad: isBad,
      };

      setItems((prev) => [...prev, newItem]);
    }, 1000);

    return () => clearInterval(dropInterval);
  }, [gameOver]);

  // ⬇️ Move items down + detect collisions
  useEffect(() => {
    if (gameOver) return;

    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 10 })) // Move down
          .filter((item) => {
            // 🧺 Collision with basket
            if (
              item.y > GAME_HEIGHT - 80 &&
              item.x > basketX &&
              item.x < basketX + BASKET_WIDTH
            ) {
              setScore((s) => s + (item.bad ? -5 : 10)); // Score logic
              return false; // Remove item after catch
            }

            // ❌ Remove item if it goes off screen
            if (item.y > GAME_HEIGHT) return false;

            return true;
          })
      );
    }, 100);

    return () => clearInterval(moveInterval);
  }, [basketX, gameOver]);

  // 🔄 Restart game
  const restartGame = () => {
    setScore(0);
    setItems([]);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {/* 🎮 Game Title */}
      <h2 className="text-xl font-bold mb-2">You're Offline! Play & Relax 🎮</h2>

      {/* 🏆 Score Display */}
      <p className="mb-2">Score: {score}</p>

      {/* 🕹️ Game Board */}
      <div
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          border: "3px solid black",
          position: "relative",
          overflow: "hidden",
          background: "#fff3e0",
        }}
      >
        {/* 🍕 Falling Items */}
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              fontSize: "28px",
            }}
          >
            {item.type}
          </div>
        ))}

        {/* 🧺 Basket */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: basketX,
            width: BASKET_WIDTH,
            height: 40,
            background: "brown",
            borderRadius: 10,
          }}
        />
      </div>

      {/* 🔄 Restart Button */}
      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Restart 🔄
      </button>
    </div>
  );
};

export default OfflineGame;

