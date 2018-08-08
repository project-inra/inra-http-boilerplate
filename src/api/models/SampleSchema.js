export default (mongoose) => {
  const Schema = mongoose.Schema;
  

  const sample = new Schema({
    sample: {type: String, required: true},
    created_at: Date,
    updated_at: Date,
  });


  return {schema: sample, modelName: 'Sample'}
}