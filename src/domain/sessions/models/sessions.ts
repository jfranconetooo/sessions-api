
import { Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const SessionsSchema = new Schema(
  {
    professional: String,
    availability: [
      {
        date: Date,
        interval_hours: [
          {
            startTime: String,
            endTime: String,
          },
        ],
        booked_sessions: {
            type: [
                {
                    client: String,
                    date: Date,
                    hour: String
                }
            ],
            default: []
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);


SessionsSchema.plugin(mongoosePaginate);

export default model("sessions", SessionsSchema);