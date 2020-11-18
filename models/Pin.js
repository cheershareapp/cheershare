import mongoose from 'mongoose'

// TODO figure out mongoose FK lookup
import User from "next-auth";
import Board from "./Board";

/* PinSchema will correspond to a collection in your MongoDB database. */
const PinSchema = new mongoose.Schema({
  ownerId: {
    /* The owner of this board */

    type: String,
    required: [true, "Please provide owner to this board"],
  },
  boardId: {
    type: String,
    required: [true, "Please provide the board which this pin belongs."],
  },
  mediaUrl: {
    type: String,
  },
  message: {
    type: String,
  },
  mediaRatioHint: {
    type: String,
  },
  columnIndex: {
    // required: [true, 'Please provide the position of this pin.'],
    type: Number,
  },
  itemIndex: {
    // required: [true, 'Please provide the position of this pin.'],
    type: Number,
  },
  likeCount: {
    type: Number,
  },
}, {  /* TODO refactor toJSON to a global place */
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id.toString()
            delete ret._id;
            delete ret.__v;
        }
    }
});

export default mongoose.models.Pin || mongoose.model('Pin', PinSchema)
