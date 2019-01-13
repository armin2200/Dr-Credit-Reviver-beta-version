import React from "react";
import styled, { css } from "react-emotion";

const Container = styled("div")`
  cursor: pointer;
  background-color: gray;
  border-radius: 50%;
  color: #111;
  height: 40px;
  overflow: visible;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Rubik;
  font-size: 13px;
`;

const getInitials = st => {
  let names = st.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
const Avatar = ({ user }) => {
  return (
    <Container>
      {user.profileImageUrl ? (
        <img
          className={css`
            border-radius: 50%;
            width: 40px;
            height: 40px;
          `}
          src={user.profileImageUrl}
          alt={user.fullname}
        />
      ) : (
        <span>{getInitials(user.fullname)}</span>
      )}
    </Container>
  );
};

export default Avatar;
