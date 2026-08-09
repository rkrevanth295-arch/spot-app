import boto3
import uuid

AWS_ACCESS_KEY = "AKIATTYHHBPM7HSD5QGA"
AWS_SECRET_KEY = "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"
AWS_BUCKET_NAME = "spot-hyderabad-photos-295-248586374105-ap-south-1-an"
AWS_REGION = "ap-south-1"

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)


def upload_photo(file_bytes, filename):
    ext = filename.split('.')[-1] if '.' in filename else 'jpg'
    unique_name = f"spots/{uuid.uuid4()}.{ext}"
    content_type = f"image/{ext}" if ext in ['jpg', 'jpeg', 'png', 'webp'] else "image/jpeg"
    
    s3_client.put_object(
        Bucket=AWS_BUCKET_NAME,
        Key=unique_name,
        Body=file_bytes,
        ContentType=content_type,
        ACL='public-read'
    )
    
    url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{unique_name}"
    return url