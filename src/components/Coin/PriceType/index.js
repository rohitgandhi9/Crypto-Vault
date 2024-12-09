import { useState } from "react"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./styles.css"
export default function TogglePriceType({priceType,handlePriceTypeChange}) {

    return (
        <div className="toggle-group">
            <ToggleButtonGroup
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                sx={{
                    "&.Mui-selected": {
                        color: "var(--blue) !important",
                    },
                    borderColor: "var(--blue)",
                    border: "unset !important",
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid var(--blue)!important",
                        borderColor: "unset",
                        color: "var(--blue) !important ",
                    },
                    "& .MuiToggleButton-standard": {
                        color: "var(--blue) !important",
                    },
                }}
            >
                <ToggleButton value="prices" className="toggle-button">
                    Price
                </ToggleButton>
                <ToggleButton value="market_caps" className="toggle-button">
                    Market Cap
                </ToggleButton>
                <ToggleButton value="total_volumes" className="toggle-button">
                    Total Volume
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
