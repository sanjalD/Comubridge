import cv2
import os
import pickle
import mediapipe as mp

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Create the Hands object
hands = mp_hands.Hands(static_image_mode=False, min_detection_confidence=0.3)

DATA_DIR = './data'

data = []
labels = []

# Loop through each directory in the data directory
for dir_ in os.listdir(DATA_DIR):
    dir_path = os.path.join(DATA_DIR, dir_)
    if os.path.isdir(dir_path):
        # Loop through each image file in the directory
        for img_path in os.listdir(dir_path):
            img_path = os.path.join(dir_path, img_path)
            if os.path.isfile(img_path):
                data_aux = []

                # Read the image and convert it to RGB color space
                img = cv2.imread(img_path)
                img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

                # Process the image to extract hand landmarks
                results = hands.process(img_rgb)

                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        for landmark in hand_landmarks.landmark:
                            # Extract x and y coordinates of each landmark
                            x = landmark.x
                            y = landmark.y
                            data_aux.append(x)
                            data_aux.append(y)

                            print('x : ', x)
                            print('y : ', y)

                            # Draw the landmarks on the image
                            mp_drawing.draw_landmarks(
                                img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                if len(data_aux) > 0:
                    data.append(data_aux)
                    labels.append(dir_)

                # Display the image with landmarks
                cv2.imshow('Hand Landmarks', img)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

# Save the data and labels to a pickle file
with open('data.pickle', 'wb') as f:
    pickle.dump({'data': data, 'labels': labels}, f)

# Release the resources
hands.close()
cv2.destroyAllWindows()
