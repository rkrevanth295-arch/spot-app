import os
import uuid
import boto3

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME", "")
AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")

ALLOWED_EXT = {"jpg", "jpeg", "png", "webp"}

s3_client = None
if AWS_ACCESS_KEY and AWS_SECRET_KEY and AWS_BUCKET_NAME:
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_REGION,
    )


def upload_photo(file_bytes, filename):
    if not s3_client:
        raise RuntimeError("Photo storage is not configured")
    ext = (filename.rsplit(".", 1)[-1] if filename and "." in filename else "jpg").lower()
    if ext not in ALLOWED_EXT:
        ext = "jpg"
    unique_name = f"spots/{uuid.uuid4()}.{ext}"
    content_type = f"image/{'jpeg' if ext == 'jpg' else ext}"

    s3_client.put_object(
        Bucket=AWS_BUCKET_NAME,
        Key=unique_name,
        Body=file_bytes,
        ContentType=content_type,
    )

    return f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{unique_name}"
