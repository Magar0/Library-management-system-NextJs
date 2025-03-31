"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

export const getAccountReq = async ({
  pageNo,
  pageSize,
  sort,
}: {
  pageSize: number;
  pageNo: number;
  sort: string;
}) => {
  try {
    const sorting =
      sort === "name=asc"
        ? users.fullName
        : sort === "name=desc"
          ? desc(users.fullName)
          : desc(users.createdAt);

    // fetch all account request
    const response = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        universityId: users.universityId,
        universityCard: users.universityCard,
        createdAt: users.createdAt,
        totalCount: sql<number>`COUNT(*) OVER()`,
      })
      .from(users)
      .where(eq(users.status, "PENDING"))
      .limit(pageSize)
      .offset((pageNo - 1) * pageSize)
      .orderBy(sorting);

    return {
      data: JSON.parse(JSON.stringify(response)),
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const approveAccount = async (userId: string, value: boolean) => {
  try {
    const data = await db
      .update(users)
      .set({ status: value ? "APPROVED" : "REJECTED" })
      .where(eq(users.id, userId))
      .returning();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
