import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';

type BaseVideoProps = {
    name: string;
    defaultHost: string;
    endpoint: string;
} & CmsContent;

const BaseVideo = ({ ...data }: BaseVideoProps) => {
    return (
        <Box>
            <video
                className="amp-dc-video"
                style={{ width: '100%' }}
                crossOrigin="anonymous"
                poster={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}?protocol=https`}
                controls
                src={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}/mp4_720p?protocol=https`}
            >
                <source
                    src={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}/mp4_720p?protocol=https`}
                    data-res="High"
                    data-bitrate="2119"
                    data-label="High"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}/mp4_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="689"
                    data-label="Medium"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}/webm_720p?protocol=https`}
                    data-res="High"
                    data-bitrate="2000"
                    data-label="high"
                    type="video/webm"
                />

                <source
                    src={`https://${data.defaultHost}/v/${data.endpoint}/${data.name}/webm_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="624"
                    data-label="Medium"
                    type="video/webm"
                />

                <track
                    label="English"
                    kind="captions"
                    srcLang="en"
                    src={`https://cdn.c1.amplience.net/c/${data.endpoint}/${data.name}-captions-en-US`}
                    default
                />
            </video>
            <Box className="pause-button inactive"></Box>
        </Box>
    );
};

export default BaseVideo;
