import mongoose from 'mongoose'
import Pin from "./Pin";

/* BoardSchema will correspond to a collection in your MongoDB database. */
const BoardSchema = new mongoose.Schema({
  title: {
    /* The title of this board */

    type: String,
    required: [true, 'Please provide a title for this board.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ownerId: {
    /* The owner of this board */

    type: String,
    required: [true, "Please provide owner to this board"],
  },
  recipientId: {
    type: String,
  },
  recipientFirstName: {
    type: String,
    required: [true, 'Please specify the recipient\'s first name.'],
    maxlength: [120, 'Recipient name specified cannot be more than 120 characters'],
  },
  recipientLastName: {
    type: String,
    required: [true, 'Please specify the recipient\'s last name.'],
    maxlength: [120, 'Recipient name specified cannot be more than 120 characters'],
  },
  deliveryStatus: {
    /* Has the board been delivered, if applicable */

    type: Boolean,
  },
  lockedStatus: {
    /* Has the board been locked, if applicable */

    type: Boolean,
  },
  font: {
    /* Font to be used for this board, if applicable */

    type: String,
  },
  backgroundImage: {
    /* Url to the background image */

    // required: [true, 'Please provide an image url for the board\'s background.'],
    type: String,
  },
  coverImage: {
    /* Url for the cover photo */

    // required: [true, 'Please provide an image url for the cover photo of this board.'],
    type: String,
  },
}, {
  toJSON: {
    transform: function(doc, ret) {
      ret.createdAt = +(ret.createdAt);
      ret.updatedAt = +(ret.updatedAt);
      ret.id = ret._id.toString();

      delete ret._id;
      delete ret.__v;
    }
  },
  timestamps: true
  // Consider just using a timestamp function
});

// TODO figure out subdocs
// https://mongoosejs.com/docs/subdocs.html#subdocuments-versus-nested-paths

BoardSchema.statics.index = async (queryFilter) => {
  // const queryFilter = {
    // ownerId
    // id
  // };
  const boards = await Board.find(queryFilter);
  const responsePromise = boards.map(async board => {
    return {
      ...board.toJSON(),
      pinCount: await Pin.countDocuments({ boardId: board._id })
    }
  });

  return Promise.all(responsePromise);
};

const Board = mongoose.models.Board || mongoose.model('Board', BoardSchema)
export default Board;
