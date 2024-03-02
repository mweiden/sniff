import React from 'react';
import { styled } from "styled-components";

const PostContainer = styled.div`
    max-width: 75%;
`;

const PostTitle = styled.span`
    font-weight: bold;
`;

const PostDateTime = styled.span`
    font-size: 0.75em;
    color: #555555;
`;

type PostProps = {
    title: string;
    body: string;
    created_at: string;
}

const Post = ({ title, body, created_at }: PostProps) =>
    <PostContainer>
        <PostTitle>{title}</PostTitle>
        <br/>
        <PostDateTime>{created_at}</PostDateTime>
        <p>
            {body}
        </p>
    </PostContainer>

export default Post;