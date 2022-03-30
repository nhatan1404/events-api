import mongoose from 'mongoose';
import QRCode from 'qrcode';

export const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    address: { type: String, required: true },
    qrImage: { type: String },
    quantity: { type: Number, required: true },
    placeHost: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    participantList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    timeStart: { type: String },
    timeFinish: { type: String },
  },
  { timestamps: true },
);

EventSchema.pre(/^(updateOne|save|findOneAndUpdate)/, function (next) {
  QRCode.toDataURL(this._id.toString())
    .then((url) => {
      this.qrImage = url;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

export const eventModel = mongoose.model('Event', EventSchema);
