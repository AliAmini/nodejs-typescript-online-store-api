import { Schema, model, Types } from 'mongoose';

export interface ICategory {
  _id: string | Types.ObjectId,
  name: string;
  parent?: string | Types.ObjectId,
  children?: string[] | Types.ObjectId[],
  discountPercent?: number;
}

const categortySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  discountPercent: Number,
  parent: { type: Schema.Types.ObjectId, ref: 'category' },
  children: [{ type: Schema.Types.ObjectId, ref: 'category' }]
});



const Category = model<ICategory>('Category', categortySchema);

export default Category;