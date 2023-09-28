import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddfrnd, setshowAddfrnd] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [showSplitBill, setshowSplitBill] = useState(false);
  const [selectedFriend, setselectedFriend] = useState(null);
  function handleShowAddFriend() {
    setshowAddfrnd((show) => !show);
  }
  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setshowAddfrnd(false);
  }
  function handleSelectClicked() {
    setshowSplitBill((select) => !select);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          OnSelectClicked={handleSelectClicked}
          showSplitBill={showSplitBill}
        />
        {showAddfrnd && <FormAddFriend onAddFriends={handleAddFriends} />}
        <Button onClick={handleShowAddFriend}>
          {showAddfrnd ? "close" : "Add friend"}
        </Button>
      </div>
      {showSplitBill && <FormSplitBill />}
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FriendsList({ friends, OnSelectClicked, showSplitBill }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          OnSelectClicked={OnSelectClicked}
          showSplitBill={showSplitBill}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, OnSelectClicked, showSplitBill }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={OnSelectClicked}>
        {!showSplitBill ? "Select" : "Close"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0 };

    onAddFriends(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label> 👩🏽‍🤝‍👩🏼 Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 📮 Image Url </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X </h2>
      <label>😁 Bill Value </label>
      <input type="text" />
      <label> 👩‍🎤 Your expense </label>
      <input type="text" />
      <label> 👩🏻‍🤝‍🧑🏻 X's expense </label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Add</Button>
    </form>
  );
}
