import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PageContainer from "../../layout/PageContainer";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
];

const pieData = [
  { name: "Suppliers", value: 24 },
  { name: "Retailers", value: 18 },
];

const COLORS = ["#6366f1", "#22c55e"];

export default function Dashboard() {
  return (
    <PageContainer>
      <Box>

        <Typography variant="h6" fontWeight={600} mb={2}>
          Dashboard Overview
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={3}
          mb={4}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2">
                Total Suppliers
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">24</Typography>
                <TrendingUpIcon />
              </Stack>
              <Typography variant="caption">
                +12% this month
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2">
                Active Orders
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">12</Typography>
                <TrendingUpIcon />
              </Stack>
              <Typography variant="caption">
                +5% this week
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2">
                Revenue
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">₹1,20,000</Typography>
                <TrendingUpIcon />
              </Stack>
              <Typography variant="caption">
                +18% growth
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
          gap={3}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              p: 2,
            }}
          >
            <Typography variant="subtitle1" mb={2} fontWeight={600}>
              Monthly Sales
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              p: 2,
            }}
          >
            <Typography variant="subtitle1" mb={2} fontWeight={600}>
              Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Box>

      </Box>
    </PageContainer>
  );
}