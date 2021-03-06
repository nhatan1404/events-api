import { eventModel } from './event.model.js';

export class EventService {
  constructor() {
    this.model = eventModel;
  }

  async findAll() {
    return this.model.find().sort({ _id: -1 });
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findByIds(ids) {
    return this.model.find({
      _id: { $in: ids },
    });
  }

  async store(eventData) {
    const createdEvent = new this.model(eventData);
    return createdEvent.save();
  }

  async update(id, eventData) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: eventData,
      },
      { new: true },
    );
  }

  async addUserToList(id, userId) {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { participantList: { _id: userId } } },
      { upsert: true },
    );
  }

  async destroy(id) {
    const event = await this.findById(id);
    if (event) {
      return event.remove();
    }
    return null;
  }

  async clear() {
    return this.model.remove({});
  }
}
