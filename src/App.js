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
  const [selectedFriend, setselectedFriend] = useState(null);
  function handleShowAddFriend() {
    setshowAddfrnd((show) => !show);
  }
  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setshowAddfrnd(false);
  }
  function handleSeletedFried(friend) {
    //setselectedFriend(friend);
    setselectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          OnSelectClicked={handleSeletedFried}
          selectedFriend={selectedFriend}
        />

        {showAddfrnd && <FormAddFriend onAddFriends={handleAddFriends} />}

        <Button onClick={handleShowAddFriend}>
          {showAddfrnd ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
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
function FriendsList({ friends, selectedFriend, OnSelectClicked }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          OnSelectClicked={OnSelectClicked}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, OnSelectClicked, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => OnSelectClicked(friend)}>
        {!isSelected ? "Select" : "Close"}
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
function FormSplitBill({ selectedFriend }) {
  const [billValue, setBillValue] = useState(0);
  const [yourexp, setyourexp] = useState(0);
  const frndexp = billValue ? billValue - yourexp : "";
  const [whopay, setwhopay] = useState("you");

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>😁 Bill Value </label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label> 👩‍🎤 Your expense </label>
      <input
        type="text"
        value={yourexp}
        onChange={(e) =>
          setyourexp(
            Number(e.target.value) > billValue
              ? yourexp
              : Number(e.target.value)
          )
        }
      />
      <label> 👩🏻‍🤝‍🧑🏻 {selectedFriend.name}'s expense </label>
      <input type="text" disabled value={frndexp} />
      <label>🤑 Who is paying the bill</label>
      <select value={whopay} onChange={(e) => setwhopay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
