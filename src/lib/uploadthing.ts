import {generateComponents} from '@uploadthing/react';
import {generateReactHelpers} from '@uploadthing/react/hooks';

import type {OurFilerouter} from '@/app/api/uploadthing/core';

export const {UploadButton, UploadDropzone, Uploader} = generateComponents<OurFilerouter>();

export const {useUploadThing, uploadFiles} = generateReactHelpers<OurFilerouter>()