import mongoose from 'mongoose';

export function connect() {
    mongoose.connect(
        'mongodb+srv://root:vkka9iPo4cvL9FCe@cluster0.yi0c5.mongodb.net/dance_music?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    );
}

