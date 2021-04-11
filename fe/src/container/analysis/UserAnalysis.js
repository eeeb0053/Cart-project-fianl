import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios'
import { Wrapper } from 'container/analysis/Analysis.style';
import { MyResponsivePie } from 'container/'
import { Divider } from 'antd';

const UserAnalysis = () => {
    return(
    <Wrapper>
        <Divider />
          <MyResponsivePie/>
        <Divider> C:ART  |  Seoul Museum of Art </Divider>
    </Wrapper>
)
}

export default UserAnalysis;
