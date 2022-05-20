import React from "react";
import {Box, Button, Typography} from "@mui/material";

const NotFoundPage = (props) => {
    return (
        <Box sx={{ display: "flex", flexDirection:"column"}}>
            <Typography variant={"h3"}>404 Page not found</Typography>
            <Button onClick={() => props.history.push("/dashboard")}>Перейти на главную</Button>
        </Box>
    )
}

export default NotFoundPage