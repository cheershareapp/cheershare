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
  ownerName: {
    type: String
  },
  collaborators: {
    type: [String],
  },
  recipientEmail: {
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

    type: String,
  },
  coverImage: {
    /* Url for the cover photo */

    type: String,
  },
  tier: {
    /* Paid tier for a board (should default to 'mini') */

    type: String,
    default: 'mini'
  },
}, {
  toJSON: {
    transform: function(doc, ret) {
      // TODO(future) get the ownerName by doing a User lookup
      // User.findOne(ret.ownerId);

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

// TODO(future) figure out subdocs
// https://mongoosejs.com/docs/subdocs.html#subdocuments-versus-nested-paths

BoardSchema.statics.index = async (queryFilter, options = {}) => {
  const boards = await Board.find(queryFilter);
  const { nestPins } = options;
  const responsePromise = boards.map(async board => {
    let pins = {};
    if (nestPins) {
      pins = await Pin.find({ boardId: board._id });
      pins = {
        pins: pins.map(v => v.toJSON())
      };
    }

    return {
      ...board.toJSON(),
      ...pins,
      pinCount: await Pin.countDocuments({ boardId: board._id })
    }
  });

  return Promise.all(responsePromise);
};

const Board = mongoose.models.Board || mongoose.model('Board', BoardSchema)
export default Board;
