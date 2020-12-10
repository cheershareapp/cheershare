import mongoose from 'mongoose'

const PinSchema = new mongoose.Schema({
  ownerId: { /* The owner of this pin */
    type: String,
    required: [true, "Please provide owner to this board"],
  },
  ownerName: {
    type: String,
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
  columnIndex: {
    type: Number,
  },
  rowIndex: {
    type: Number,
  },
  likeCount: {
    type: Number,
  },
}, {  /* TODO refactor toJSON to a global place */
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
});

export default mongoose.models.Pin || mongoose.model('Pin', PinSchema)
