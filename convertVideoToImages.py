import cv2


def convert_video_to_images(video_path, output_folder, num_images):
    # Open the video file
    video = cv2.VideoCapture(video_path)

    # Get the total number of frames in the video
    total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))

    # Calculate the frame interval to extract the desired number of images
    frame_interval = total_frames // num_images

    # Initialize a counter for the extracted images
    image_count = 0
    frame_count = 0

    # Loop through the frames and extract images at the specified interval
    while video.isOpened():
        ret, frame = video.read()

        if not ret:
            break

        # Extract an image every frame_interval frames
        if image_count <= total_frames:
            image_path = f"{output_folder}/image_{image_count}.png"
            cv2.imwrite(image_path, frame)
            image_count += 1
        else:
            break
        # Break the loop if the desired number of images has been extracted
        # if image_count == num_images:
        #     break

    # Release the video file
    video.release()


# Usage example
video_path = "D:\\work\\convert-files\\黄金88免费游戏.mp4"
output_folder = "D:\\work\\convert-files\\video_frames\\slot-216"
num_images = 100  # Change the number of images to 1

convert_video_to_images(video_path, output_folder, num_images)
