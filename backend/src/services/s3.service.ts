import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { configs } from "../configs/configs";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    }),
  ) {}
  public async uploadCV(
    file: UploadedFile,
    itemType: string,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPathCV(file.name, itemType, itemId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public async deleteCV(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      }),
    );
  }

  public async uploadCandidateAvatar(
    file: UploadedFile,
    itemType: string,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPathCandidateAvatar(file.name, itemType, itemId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public async deleteCandidateAvatar(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      }),
    );
  }

  public async uploadHRAvatar(
    file: UploadedFile,
    itemType: string,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPathHRAvatar(file.name, itemType, itemId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public async deleteHRAvatar(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      }),
    );
  }

  public async uploadCompanyAvatar(
    file: UploadedFile,
    itemType: string,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPathCompanyIcon(file.name, itemType, itemId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public async deleteCompanyAvatar(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      }),
    );
  }

  private buildPathCV(
    fileName: string,
    itemType: string,
    itemId: string,
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }

  private buildPathCandidateAvatar(
    fileName: string,
    itemType: string,
    itemId: string,
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }

  private buildPathHRAvatar(
    fileName: string,
    itemType: string,
    itemId: string,
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }

  private buildPathCompanyIcon(
    fileName: string,
    itemType: string,
    itemId: string,
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
