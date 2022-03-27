import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_URL } from 'utils/constants/constants';

function Admin() {
  const [hotelList, setHotelList] = useState([]);
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const adminId = location.pathname.slice(-1);
  const navigate = useNavigate();

  useEffect(() => {
    loadAdminData();
  }, []);

  function loadAdminData() {
    try {
      fetch(ADMIN_URL(adminId))
        .then(res => res.json())
        .then(res => setHotelList(res.data));
    } catch (err) {
      console.error(err);
    }
  }

  function submitImage(e, hotelId) {
    const formData = new FormData();
    const uploadedFile = e.target.files[0];
    formData.append('img', uploadedFile);
    fetch(ADMIN_URL(adminId, hotelId), {
      method: 'POST',
      headers: {},
      body: formData,
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    reloadHotelList();
  }

  function updatePrice(e) {
    const formData = new FormData();
    const val = e.target.value;
    setPrice(val);
    formData.append('price', price);
  }

  async function submitPrice(id) {
    const formData = new FormData();
    formData.append('price', price);

    try {
      await fetch(ADMIN_URL(adminId, id), {
        method: 'POST',
        headers: {},
        body: formData,
      })
        .then(res => res.json())
        .then(res => console.log(res));
      reloadHotelList();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteHotel(id) {
    await fetch(ADMIN_URL(adminId, id), {
      method: 'DELETE',
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    reloadHotelList();
  }

  function reloadHotelList() {
    fetch(ADMIN_URL(adminId))
      .then(res => res.json())
      .then(res => setHotelList([...res.data]))
      .catch(err => console.error(err));
  }
  return (
    <Wrapper>
      <HotelList>
        <ListTitle>Hotel List</ListTitle>
        {hotelList.length &&
          hotelList.map((hotel, idx) => (
            <HotelItem key={idx}>
              <p>{hotel.hotelId}</p>

              <Name>{hotel.name}</Name>
              <ImgContainer
                onClick={() => navigate(`/findstay/${hotel.hotelId}`)}
              >
                <img src={hotel.img} alt={hotel.name} />
                <UploadButton>
                  <input
                    type="file"
                    src=""
                    alt="change_img"
                    accept="image/*"
                    onChange={e => submitImage(e, hotel.hotelId)}
                  />
                </UploadButton>
              </ImgContainer>
              <TextContainer>
                <Price>{`가격: ${hotel.price}`}</Price>
                <PriceInputWrapper>
                  <PriceInput onChange={e => updatePrice(e)} />
                  <PriceButton onClick={() => submitPrice(hotel.hotelId)}>
                    변경
                  </PriceButton>
                </PriceInputWrapper>
              </TextContainer>
              <CloseButton onClick={() => deleteHotel(hotel.id)}>
                <GrClose />
              </CloseButton>
            </HotelItem>
          ))}
      </HotelList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HotelList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50rem;
`;

const ListTitle = styled.h1`
  font-size: 2rem;
  margin: 2rem 0 2rem 0;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
`;

const HotelItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;

  & > img {
    margin-right: 1rem;
    width: 6rem;
  }
`;

const UploadButton = styled.div`
  //
`;

const TextContainer = styled.div`
  //
`;

const Name = styled.h3`
  //
`;

const Price = styled.p``;

const PriceInputWrapper = styled.span``;

const PriceInput = styled.input``;

const PriceButton = styled.button``;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Admin;
