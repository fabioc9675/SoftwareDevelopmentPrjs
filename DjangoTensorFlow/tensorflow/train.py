import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras import layers, models
import os

print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
tf.test.gpu_device_name()  # will be depricated soon
tf.config.list_physical_devices('GPU')  # this is the newer way

# Carga del dataset

animals = np.load(os.getcwd() + os.path.join(os.sep,
                  "tensorflow", "datasets", "animals.npy"))
labels = np.load(os.getcwd() + os.path.join(os.sep,
                 "tensorflow", "datasets", "labels.npy"))

# randomiza el orden del dataset
s = np.arange(animals.shape[0])
np.random.shuffle(s)
animals = animals[s]
labels = labels[s]

# identificacion del dataset
num_classes = len(np.unique(labels))
data_length = len(animals)
print("Cantidad de clases = ", num_classes)
print("Cantidad de datos = ", data_length)

# Composicion del dataset y normalizacion
(x_train, x_test) = animals[(int)(0.1*data_length):], animals[:(int)(0.1*data_length)]
x_train = x_train.astype('float32')/255
x_test = x_test.astype('float32')/255
train_length = len(x_train)
test_length = len(x_test)

(y_train, y_test) = labels[(int)(0.1*data_length):], labels[:(int)(0.1*data_length)]

# Entrenamiento del modelo
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(50, 50, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))

model.summary()

model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10))

model.summary()

# Compilacion del modelo
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(
                  from_logits=True),
              metrics=['accuracy'])

history = model.fit(x_train, y_train, epochs=100,
                    validation_data=(x_test, y_test))

# Plot de resultados
plt.plot(history.history['accuracy'], label='accuracy')
plt.plot(history.history['val_accuracy'], label='val_accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.ylim([0.5, 1])
plt.legend(loc='lower right')

test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)

print(test_acc)
model.save("model.h5")
