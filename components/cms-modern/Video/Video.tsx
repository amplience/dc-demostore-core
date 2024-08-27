import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';

export interface VideoProps extends CmsContent {
    video?: {
        defaultHost?: string;
        endpoint?: string;
        name?: string;
    };
    captions?: boolean;
}

const Video = ({ video, captions = true }: VideoProps) => {
    if (!video) {
        return null;
    }
    return (
        <Box>
            <video
                className="amp-dc-video"
                style={{ width: '100%' }}
                crossOrigin="anonymous"
                poster={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}?protocol=https`}
                controls
                src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
            >
                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
                    data-res="High"
                    data-bitrate="2119"
                    data-label="High"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="689"
                    data-label="Medium"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_720p?protocol=https`}
                    data-res="High"
                    data-bitrate="2000"
                    data-label="high"
                    type="video/webm"
                />

                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="624"
                    data-label="Medium"
                    type="video/webm"
                />

                {captions && (
                    <track
                        label="English"
                        kind="captions"
                        srcLang="en"
                        src={`https://cdn.c1.amplience.net/c/${video.endpoint}/${video.name}-captions-en-US`}
                        default
                    />
                )}
            </video>
            <Box className="pause-button inactive"></Box>
        </Box>
    );
};

export default Video;
