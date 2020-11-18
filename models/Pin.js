import mongoose from 'mongoose'

// TODO figure out mongoose FK lookup
import User from "next-auth";
import Board from "./Board";

/* PinSchema will correspond to a collection in your MongoDB database. */
const PinSchema = new mongoose.Schema({
  owner: {
    /* The owner of this board */

    type: String,
    required: [true, "Please provide owner to this board"],
  },
  boardId: {
    type: String,
    required: [true, "Please provide the board which this pin belongs."],
  },
  mediaUrl: {
    required: [true, 'Please provide an image url for this pet.'],
    type: String,
  },
  message: {
    type: String,
  },
  mediaRatioHint: {
    type: String,
  },
  sortOrder: {
    required: [true, 'Please provide the position of this pin.'],
    type: String,
  },
  likeCount: {
    type: Number,
  },
});

export default mongoose.models.Pin || mongoose.model('Pin', PinSchema)
