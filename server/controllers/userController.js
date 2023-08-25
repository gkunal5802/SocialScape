import User from "../models/User.js";

// !READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => {
        User.findById(id);
      })
    );

    const formattedFriends = friends.map(
      (_id, firstName, lastName, location, occupation, picturePath) => {
        return { _id, firstName, lastName, location, occupation, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// !UPDATE
export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friend)) {
      user.friends = user.friends.filter((id) => id !== friend);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friend);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => {
        User.findById(id);
      })
    );

    const formattedFriends = friends.map(
      (_id, firstName, lastName, location, occupation, picturePath) => {
        return { _id, firstName, lastName, location, occupation, picturePath };
      }
    );

    res.status(201).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
