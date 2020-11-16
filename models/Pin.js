import mongoose from 'mongoose'
import User from "next-auth";

/* PinSchema will correspond to a collection in your MongoDB database. */
const PinSchema = new mongoose.Schema({
  owner: {
    /* The owner of this board */

    type: User,
    required: [true, "Please provide owner to this board"],
  },
  board: {
    type: mongoose.models.Board,
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
})

export default mongoose.models.Pin || mongoose.model('Board', PinSchema)
